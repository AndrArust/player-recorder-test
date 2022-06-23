import React, { useRef, useState } from 'react';
import VideoRecorder from '../video-recorder';
import AWSService from '../services/AWSService';
import { v4 as uuidv4 } from 'uuid';

import './Demo.scss';
import VideosPreview from '../videos-preview';

const Demo = () => {
  const $RecorderRef = useRef(null);

  const [version, setVersion] = useState(0);
  const [width, setWidth] = useState(450);
  const [height, setHeight] = useState(450);

  const onStart = () => console.log('Start.');
  const onStop = () => console.log('Stop.');
  const onProgress = (e) => console.log(`Propgress ${e}`);
  const onDownload = () => console.log('Download');

  const upload = () => {
    const blob = $RecorderRef.current.getBlob();
    if (!blob) return;
    
    const file = new File([blob], `${uuidv4()}.mp4`, { type: blob.type });
    AWSService.uploadFile(file).then(() => setVersion(version + 1));
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={() => $RecorderRef.current.start()}>START</button>

        <button onClick={() => $RecorderRef.current.stop()}>STOP</button>

        <button onClick={() => $RecorderRef.current.download()}>
          DOWNLOAD
        </button>

        <button onClick={() => upload()}>UPLOAD</button>
        <button
          onClick={() => {
            if (width < 640) {
              setWidth((oldState) => oldState + 100);
              setHeight((oldState) => oldState + 100);
            }
          }}
        >
          Make Container Larger
        </button>
        <button
          onClick={() => {
            if (width > 50) {
              setWidth((oldState) => oldState - 100);
              setHeight((oldState) => oldState - 100);
            }
          }}
        >
          Make Container Smaller
        </button>
      </div>
      <div style={{ width: width, height: height }}>
        <VideoRecorder
          ref={$RecorderRef}
          onStart={onStart}
          onStop={onStop}
          onProgress={onProgress}
          onDownload={onDownload}
          timeLimit={10}
          audio={true}
          className="test-web-cam"
        />
      </div>

      <VideosPreview key={version} />
    </div>
  );
};
export default Demo;
