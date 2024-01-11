export const reducerCases = {
    SET_TOKEN: 'SET_TOKEN',
    SET_PLAYLISTS: 'SET_PLAYLISTS',
    SET_USER: 'SET_USER',
    SET_PLAYLIST_ID: 'SET_PLAYLIST_ID',
    SET_PLAYLIST: 'SET_PLAYLIST',
    SET_PLAYING: 'SET_PLAYING',
    SET_PLAYERSTATE: 'SET_PLAYERSTATE',
}

export const initialState = {
    token: null,
    playlist: [],
    userInfo: null,
    selectedPlaylistId: '0oiLRFrovJCgyf8vZVoXGJ',
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState: false
}

const reducer = (state, action) =>{
    switch(action.type){
        case reducerCases.SET_TOKEN: {
            return {
                ...state, token: action.token
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state, playlist: action.playlist
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state, userInfo: action.userInfo
            }
        }   
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state, selectedPlaylistId: action.playlistId
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state, selectedPlaylist: action.selectedPlaylist
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state, currentlyPlaying: action.currentlyPlaying
            }
        }
        case reducerCases.SET_PLAYERSTATE: {
            return {
                ...state, playerState: action.playerState
            }
        }
        default:
            return state
    }
}


export default reducer