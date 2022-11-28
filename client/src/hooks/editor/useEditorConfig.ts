import { useCallback, useRef } from "react";
import EditorJS from '@editorjs/editorjs';

export function useEditorConfig() {
	const editorCore = useRef<EditorJS | null>(null)

	const handleInitialize = useCallback((instance: any) => {
		editorCore.current = instance
	}, [])

	const handleSave = useCallback(async () => {
		if (editorCore.current) {
			const savedData = await editorCore.current.save();
			return savedData
		}
	}, [])

	return { handleSave, handleInitialize }
} 