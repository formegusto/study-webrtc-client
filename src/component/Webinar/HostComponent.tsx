import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

function HostComponent() {
    let localVideoRef = useRef<HTMLVideoElement>(null);
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [isAir, setIsAir] = useState<boolean>(false);

    useEffect(() => {
        const newSocket = io.connect('http://localhost:8080');

        setSocket(newSocket);

        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
              width: 240,
              height: 240
            }
          }).then(stream => {
            localVideoRef.current!.srcObject = stream;
          }).catch(error => {
            console.log(`getUserMedia error: ${error}`);
          });
    }, []);

    const onAir = useCallback(() => {
        setIsAir(true);

        socket!.emit('join_host', {
            room: 1
        })
    }, [isAir, socket]);

    return (
        <VideoWrap>
            <Video
                muted
                ref={ localVideoRef }
                autoPlay
            />
            {
                !isAir && 
                <BroadcastWrap>
                    <button 
                        type="button"
                        onClick={(e) => { onAir() }} >
                            방송시작하기
                    </button>
                </BroadcastWrap>
            }
        </VideoWrap>
    )
}

const VideoWrap = styled.div`
    position: relative;

    width: 400px;
    height: 400px;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    background-color: 'black';
`;

const BroadcastWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 400px;
    height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(33,33,33,.7);

`;

export default HostComponent;