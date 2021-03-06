import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Component, createRef } from 'react';

import fabric from 'src/Fabric';
import { AppData, ObjectOptions } from 'src/types';
import { connectData, ConnectProps } from 'src/hooks/useData';

import Parts from './Parts';
import UndoRedo from './UndoRedo';

type State = {
	activePart: number;
};

interface Props extends ConnectProps<AppData> {
	push: NavigateFunction;
}

class Canvas extends Component<Props, State> {
	objects = createRef<any[]>();

	canvas = createRef<fabric.Canvas>();

	constructor(props: Props) {
		super(props);
		this.state = {
			activePart: 0
		};
		this.addText = this.addText.bind(this);
		this.addImage = this.addImage.bind(this);
		this.updateText = this.updateText.bind(this);
		this.updateActiveItem = this.updateActiveItem.bind(this);
	}

	componentDidMount() {
		const {
			data: { designer },
			dispatch
		} = this.props;

		// @ts-ignore
		this.canvas.current = new fabric.Canvas('canvas');
		dispatch({
			designer: {
				...designer,
				methods: {
					addText: this.addText,
					addImage: this.addImage,
					updateText: this.updateText,
					updateActiveItem: this.updateActiveItem
				}
			}
		});

		window.addEventListener('keyup', ({ keyCode, key }) => {
			if (keyCode === 46) {
				const active = this.canvas.current!.getActiveObjects();
				active.forEach((e) => {
					this.canvas.current!.remove(e);
				});
				this.canvas.current!.discardActiveObject().renderAll();
			}
			if (key === 'Escape') {
				this.canvas.current!.discardActiveObject().renderAll();
			}
		});
	}

	addText(text: string, o: ObjectOptions) {
		const {
			data: {
				designer: { objectOptions }
			},
			push
		} = this.props;
		const txt = new fabric.Text(text, { ...objectOptions, ...o });

		txt.on('selected', (e) => {
			push(
				// @ts-ignore
				`/text?panel=edit&text=${e.target?.get('text')}&family=${e.target?.get(
					// @ts-ignore
					'fontFamily'
				)}`
			);
		});

		txt.on('deselected', (_e) => {
			push('/text');
		});

		this.canvas.current!.add(txt);
		txt.setControlVisible('mtr', true);
		this.canvas.current!.setActiveObject(txt);
		this.canvas.current!.renderAll();
	}

	addImage(url: string | string[], o: ObjectOptions) {
		const {
			data: {
				designer: { objectOptions }
			}
		} = this.props;

		if (typeof url === 'string') {
			fabric.Image.fromURL(url, (img) => {
				img.set({ ...objectOptions, ...o });
				img.scaleToWidth(100);
				this.canvas.current!.add(img);
			});
		} else {
			url.forEach((u) => {
				fabric.Image.fromURL(u, (img) => {
					img.set({ ...objectOptions, ...o });
					img.scaleToWidth(100);
					this.canvas.current!.add(img);
				});
			});
		}

		this.canvas.current!.renderAll();
	}

	updateActiveItem(o: ObjectOptions) {
		const active = this.canvas.current!.getActiveObjects();

		if (active) {
			active.forEach((e) => {
				e.setOptions({ ...o });
			});
			this.canvas.current!.renderAll();
		}
	}

	updateText(text: string) {
		const active = this.canvas.current!.getActiveObject();

		if (active && active.type === 'text') {
			// @ts-ignore
			active.set('text', text);
		}
		this.canvas.current!.renderAll();
	}

	render() {
		const {
			data: {
				product: {
					parts,
					canvas: { width, height, top, left }
				}
			}
		} = this.props;
		const { activePart } = this.state;

		return (
			<div className='fixed w-screen h-screen pt-20 pl-120 pb-24 pr-4'>
				<div className='w-full h-full relative flex items-center justify-center no-transition'>
					<UndoRedo />
					<Parts
						zoomIn={() => {}}
						zoomOut={() => {}}
						setPart={() => {}}
						active={activePart}
					/>
					<div
						className='w-150 h-150 relative bg-no-repeat bg-cover'
						style={{
							backgroundImage: `url(${parts[activePart].image})`
						}}
					>
						<div
							className='absolute border border-dashed'
							style={{
								top,
								left
							}}
						>
							<canvas id='canvas' width={`${width}`} height={`${height}`} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const RouterCanvas = (props: ConnectProps<AppData>) => {
	const push = useNavigate();
	return <Canvas {...props} push={push} />;
};

export default connectData(RouterCanvas);
