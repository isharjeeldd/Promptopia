'use client'
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => {
                return (<>
                    <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
                </>)
            })}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {

    }

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section>
            <form action="" className="relative w-full flex-cenrer">
                <input type="text" placeholder="Search for a tag or a username" className="search_input peer mt-5" value={searchText} required onChange={handleSearchChange} />
            </form>
            <PromptCardList data={posts} handleTagClick={() => { }} />
        </section>
    )
}

export default Feed