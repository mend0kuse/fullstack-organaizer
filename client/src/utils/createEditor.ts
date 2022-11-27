import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from '../editorClasses/SimpleImage';
import Table from '@editorjs/table';
import LinkTool from '@editorjs/link'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';

export default function createEditor(holder: string, blocks: any[] = []) {
	return new EditorJS({
		placeholder: 'Let`s write an awesome story!',
		autofocus: true,
		holder: holder,
		tools: {
			underline: Underline,
			Marker: {
				class: Marker,
				shortcut: 'CMD+SHIFT+M',
			},
			delimiter: Delimiter,
			quote: {
				class: Quote,
				inlineToolbar: true,
				shortcut: 'CMD+SHIFT+O',
				config: {
					quotePlaceholder: 'Enter a quote',
					captionPlaceholder: 'Quote\'s author',
				}
			},
			linkTool: {
				class: LinkTool,
				config: {
					endpoint: 'http://localhost:5000/fetchUrl', // Your backend endpoint for url data fetching,
				}
			},
			table: {
				class: Table,
				inlineToolbar: true,
				config: {
					rows: 2,
					cols: 3,
				},
			},
			heading: {
				class: Header,
				inlineToolbar: true,
				config: {
					placeholder: 'Enter a header',
					levels: [1, 2, 3, 4, 5, 6],
					shortcut: 'CMD+SHIFT+H',
					defaultLevel: 2
				}
			},
			list: {
				class: List,
				inlineToolbar: true,
				config: {
					defaultStyle: 'unordered'
				}
			},
			image: {
				class: SimpleImage,
				inlineToolbar: true,
			},
		},
		data: {
			blocks
		}
	})
}