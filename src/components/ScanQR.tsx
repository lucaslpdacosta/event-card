"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function ScanQR({
  onScan,
  onClose,
}: {
  onScan: (result: string) => void;
  onClose: () => void;
}) {
  const scanner = useRef<QrScanner | null>(null); // Initialize as null
  const videoEl = useRef<HTMLVideoElement>(null);
  const [qrOn, setQrOn] = useState(true);

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(
        videoEl.current,
        (result) => {
          onScan(result.data);
          onClose();
        },
        {
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      scanner.current?.stop();
      scanner.current = null;
    };
  }, [onScan, onClose]);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Ative as permissões de câmera do dispositivo."
      );
      onClose();
    }
  }, [qrOn, onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl z-10"
      >
        ×
      </button>
      <div className="w-full max-w-md aspect-square relative">
        <video ref={videoEl} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 border-4 rounded-lg pointer-events-none" />
      </div>
      <p className="text-white mt-4 text-center">
        Aponte a câmera em direção ao QR Code.
      </p>
    </div>
  );
}