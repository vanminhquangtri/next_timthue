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
export async function getStaticProps(context) {
    const response = await Blogs.getBlogList();
    if (response) {
        return {
            props: {
                posts: response,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
}

export default Blog;
