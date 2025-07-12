import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported = !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function';

type RoomParams = {
    roomId: string;
}

export function RecordRoomAudio() {

    const { roomId } = useParams<RoomParams>()

    const [isRecording, setIsRecording] = useState(false);
    const recorder = useRef<MediaRecorder | null>(null);

    function stopRecording() {
        setIsRecording(false);

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop();
        }
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData();
        formData.append('audio', audio, 'audio.webm');

        const response = await fetch(`http://localhost:8080/rooms/${roomId}/audio`, {
            method: 'POST',
            body: formData
        })

        const result = await response.json();

        alert(result)
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert("Gravação de áudio não é suportada neste navegador.");
            return;
        }

        setIsRecording(true);

        try {
            const audio = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            })

            recorder.current = new MediaRecorder(audio, {
                mimeType: 'audio/webm',
                audioBitsPerSecond: 64000
            })

            recorder.current.ondataavailable = event => {
                if (event.data.size > 0) {
                    const audioBlob = new Blob([event.data], { type: 'audio/webm' });
                    uploadAudio(audioBlob)
                }
            }

            recorder.current.onstart = () => {

            }

            recorder.current.onstop = () => {

            }

            recorder.current.start();

        } catch (error) {
            console.error("Erro ao iniciar gravação:", error);
            return;
        }
    }


    if (!roomId) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen">
            {isRecording ? (
                <>
                    <Button onClick={stopRecording}>Parar gravação</Button>
                    <p>Gravando...</p>
                </>
            ) : (
                <>
                    <Button onClick={startRecording}>Gravar áudio</Button>
                    <p>Pausado</p>
                </>
            )}
        </div>
    )
}