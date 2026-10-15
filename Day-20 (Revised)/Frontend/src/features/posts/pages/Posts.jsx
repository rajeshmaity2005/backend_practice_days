import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'


const Feed = () => {

    const { allPosts, handleAllPosts, loading, handleLike, handleUnLike } = usePost()

    useEffect(() => {
        handleAllPosts()
    }, [])

    if (loading || !allPosts) {
        return (<main><h1>Feed is Loading...</h1></main>)
    }

    // console.log(allPosts);

    return (
        <main className='feed-page'>
            <div className="feed">

                <div className="posts">
                    {allPosts.map(post => {
                        
                        return <Post user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
