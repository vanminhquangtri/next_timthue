import Blogs from 'src/api/blog';
import Link from 'next/link';

function Blog({ posts }) {
    return (
        <ul>
            {posts?.map((post) => (
                <li key={post.id}>
                    <Link href={`/demos/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
}
export async function getStaticProps() {
    const response = await Blogs.getBlogList();
    if (response) {
        return {
            props: {
                posts: response,
            },
        };
    }
    
}

export default Blog;
