import React, { Component, createContext, useContext } from 'react';

interface Props<T extends object> {
	init: T;
	persist?: boolean;
	storageListener?: boolean;
}

export interface ConnectProps<P> {
	data: P;
	dispatch: (d: Partial<P> | 'clear') => void;
}

const AppContext = createContext({ data: {}, dispatch: (_: any) => {} });

export class DataProvider<T extends object> extends Component<
	Props<T>,
	T & { isMounted: boolean }
> {
	// eslint-disable-next-line react/destructuring-assignment
	init = this.props.init;

	constructor(props: any) {
		super(props);
		const { init } = this.props;

		this.init = init;
		this.state = { ...init, isMounted: false };
		this.dispatch = this.dispatch.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	componentDidMount() {
		const { storageListener = false, persist = false } = this.props;
		this.updateState({
			...(persist ? this.getItem() : this.state),
			isMounted: true
		});
		if (storageListener) {
			window.addEventListener('storage', () => {
				this.setState(this.getItem());
			});
		}
	}

	componentWillUnmount() {
		const { storageListener = false } = this.props;
		if (storageListener) {
			window.removeEventListener('storage', () => {
				this.setState(this.getItem());
			});
		}
	}

	getItem() {
		try {
			const data = localStorage.getItem('data');
			if (data) return JSON.parse(data);
			this.persist(this.init);
			return this.init;
		} catch (e) {
			return this.init;
		}
	}

	persist = (payload: T) => {
		const { persist = false } = this.props;
		if (persist) {
			try {
				if (localStorage) {
					localStorage.setItem('data', JSON.stringify(payload));
				}
				// eslint-disable-next-line no-empty
			} catch (e) {}
		}
	};

	updateState(data: Partial<T>) {
		this.setState((p) => ({ ...p, ...data }));
		this.persist(this.state);
	}

	dispatch(payload: Partial<T> | 'clear') {
		if (payload === 'clear') {
			this.updateState(this.init);
		} else {
			this.updateState(payload);
		}
	}

	render() {
		const { isMounted } = this.state;
		const { children } = this.props;
		return (
			<AppContext.Provider
				value={{ data: this.state, dispatch: this.dispatch }}
			>
				{isMounted && children}
			</AppContext.Provider>
		);
	}
}

// Explore the possibility of mounting and
// removing contexts to enable multi store support
// by changing DataProviders context type
// Possible drawbacks are: mixture of contexts since there's a clear way
// no clear way to change the DataProvider's state and to change the key
// to persist the store with. Ideally each store should have a corresponding
// key in localstorage.
export default function useData<T extends object>() {
	const { data, dispatch } = useContext(AppContext);

	return {
		data: data as T,
		dispatch: (_: Partial<T> | 'clear') => dispatch(_)
	};
}

export function connectData<T extends object>(Comp: any) {
	const ConnectData = (props: { [key: string]: any }) => {
		const { data, dispatch } = useData<T>();

		return (
			<>
				<Comp {...props} data={data} dispatch={dispatch} />
			</>
		);
	};

	return ConnectData;
}
