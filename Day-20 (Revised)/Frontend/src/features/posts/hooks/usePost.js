import { useContext, useEffect } from "react";
import { createPost, getAllPosts, getFeed, likePost, unLikePost } from "../services/post.api";
import { PostContext } from "../post.context";


export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed, allPosts, setAllPosts } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])
        setLoading(false)
    }

    const handleLike = async (post) => {
        const data = await likePost(post)
        await handleGetFeed()
    }

    const handleUnLike = async (post) => {
        const data = await unLikePost(post)
        await handleGetFeed()
    }

    const handleAllPosts = async () => {
        
        setLoading(true)
        const data = await getAllPosts()
        setAllPosts(data.posts.reverse())
        // console.log(data);
        setLoading(false)
    }

    useEffect(() => {
        handleGetFeed()
        handleAllPosts()
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike, handleAllPosts,allPosts,setAllPosts }

}