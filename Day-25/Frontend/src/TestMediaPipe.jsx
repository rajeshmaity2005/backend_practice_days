
import { useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function TestMediaPipe() {
    const [status, setStatus] = useState("Not tested");

    async function testMediaPipe() {
        let landmarker;

        try {
            setStatus("Loading MediaPipe WASM...");

            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            setStatus("Loading face model...");

            landmarker = await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    runningMode: "VIDEO",
                    numFaces: 1,
                    outputFaceBlendshapes: true,
                }
            );

            setStatus("SUCCESS: MediaPipe initialized!");
        } catch (error) {
            console.error("MediaPipe test failed:", error);
            setStatus(`${error.name}: ${error.message}`);
        } finally {
            landmarker?.close();
        }
    }

    return (
        <div style={{ padding: 30 }}>
            <h2>MediaPipe Diagnostic Test</h2>
            <button onClick={testMediaPipe}>
                Test MediaPipe
            </button>
            <p>{status}</p>
        </div>
    );
}