import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { useCallback, useRef } from 'react';
import './App.css';
import { postApi } from './store';

const Posts = () => {
  const { data: posts } = postApi.useGetAllQuery()
  const [updatePost] = postApi.useUpdatePostMutation()
  const [deletePost] = postApi.useDeletePostMutation()
  const [addPost] = postApi.useAddPostMutation()

  const textRef = useRef(null)

  const onAdd = useCallback(
    () => {
      addPost(textRef.current.value ?? "")
      textRef.current.value = ""
    },
    [addPost],
  )

  const onToggle = useCallback(
    (post) => updatePost({ ...post, published: !post.published }),
    [updatePost],
  )
  const onDelete = useCallback(
    (post) => deletePost({ ...post, published: !post.published }),
    [deletePost],
  )

  return (
    <div className='App'>
      {posts?.map(p => (
        <div key={p.id}>
          <div>
            <input
              type="checkbox"
              checked={p.published}
              onChange={() => onToggle(p)}
            />
            <span>{p.title}</span>
            <button onClick={() => onDelete(p)}>Delete</button>
          </div>
        </div>
      ))}
      <div>
        <input type="text" ref={textRef} />
        <button onClick={() => onAdd()}>Add</button>
      </div>
    </div>
  )
}
function App() {
  return (
    <ApiProvider api={postApi}>
      <Posts />
    </ApiProvider>
  );
}

export default App;
