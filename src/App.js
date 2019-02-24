import React, { useReducer, useState, useRef, useContext, useEffect } from 'react';
import './App.css';
import reducer from './reducer';

const BookmarkDispatch = React.createContext(null);

function BookMarkInputForm() {
  const dispatch = useContext(BookmarkDispatch);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  return (
    <div className="form">
      <h2>Bookmark Details</h2>
      <input ref={titleRef} type="text" value={title} placeholder='Enter Bookmark Name' required onChange={(e) => setTitle(e.target.value)} />
      <input type="url" value={url} placeholder='Enter URL' required onChange={(e) => setUrl(e.target.value)} />
      <button onClick={() => {
        if (!title || !url) {
          return;
        }
        dispatch({
          type: 'ADD_BOOKMARK', payload: {
            id: Date.now(),
            title,
            url
          }
        });
        setTitle('');
        setUrl('');
        titleRef.current.focus();
      }}>Add Bookmark</button>
    </div>
  );
}

function Bookmark({ bookmark }) {
  const dispatch = useContext(BookmarkDispatch);
  return (
    <div className="bookmarkitem" onClick={() => { }}>
      <div className="bookmark">
        <a
          className='url'
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bookmarktitle">{bookmark.title}</div>
          <div className="bookmarkdetails">{bookmark.url}</div>
        </a>
      </div>
      <div className="bookmarkremove" onClick={() => dispatch({ type: 'DELETE_BOOKMARK', payload: bookmark.id })}>&times;</div>
    </div >
  );
}

function BookmarkList({ bookmarks }) {
  return (
    <div className="list">
      {bookmarks.length === 0 && <h3 className='notfound'>No Bookmarks found !!!</h3>}
      <ul>
        {bookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} />)}
      </ul>
    </div>
  );
}
export default function App() {
  const [bookmarks, dispatch] = useReducer(reducer, [], () => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });
  return (
    <BookmarkDispatch.Provider value={dispatch}>
      <div className="App">
        <BookMarkInputForm />
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </BookmarkDispatch.Provider>
  );
}
