import Blogs from 'src/api/blog';

export default function PostDetail({ posts }) {
    return <h5>{posts?.title}</h5>;
}

// get list of posts
export async function getStaticPaths() {
    const response = await Blogs.getBlogList();
    const paths = response.map((post) => ({
        params: { id: post.id.toString() },
    }));
    return { paths, fallback: true };
}
// get detail of post
export async function getStaticProps({ params }) {
    const response = await Blogs.getBlogDetail(params.id);
    if (response) {
        return {
            props: {
                posts: response,
            },
        };
    }
}
