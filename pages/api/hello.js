import Blogs from 'src/api/blog';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    console.log(`req`, req);
    console.log(`Blogs`, Blogs);
    const response = await Blogs.getBlogList();
    console.log(`response`, response);
    res.status(200).json({ name: 'John Doe' });
};
