import Blogs from 'src/api/blog';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { store } from 'src/store';
import appAction from 'src/store/app/action';

function servesideProps({ posts }) {
    const state = useSelector((state) => state);
    console.log('state :>> ', state);
    return (
        <ul>
            {posts?.map((post) => (
                <li key={post.id}>
                    <Link href={`/demos/getserveside/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
export async function getServerSideProps() {
    store.dispatch(appAction.SET_LOADING(true));
    const response = await Blogs.getBlogList();
    if (response) {
        return {
            props: {
                posts: response,
            },
        };
    }
}

export default servesideProps;
