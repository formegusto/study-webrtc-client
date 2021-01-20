const createSenderPeerConnection = (newSocket: SocketIOClient.Socket, localStream: MediaStream): RTCPeerConnection => {
    const pc_config = {
      "iceServers": [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls : 'stun:stun.l.google.com:19302'
        }
      ]
    }
    
    let pc = new RTCPeerConnection(pc_config);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('sender PC onicecandidate');
        newSocket.emit('senderCandidate', {
          candidate: e.candidate,
          senderSocketID: newSocket.id
        });
      }
    }

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    }

    if (localStream){
      console.log('localstream add');
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    } else {
      console.log('no local stream');
    }

    // return pc
    return pc;
  }

  export {
      createSenderPeerConnection
  }