import Blogs from 'src/api/blog';

function Blog({ posts }) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
export async function getStaticProps() {
    const response = await Blogs.getBlogList();
    return {
        props: {
            posts: response,
        },
    };
}

export default Blog;
