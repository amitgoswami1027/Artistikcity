import { Link } from '@inertiajs/inertia-react';
import React from 'react';

export default function BlogPosts({ blog_posts }) {
    return (
        Object.keys(blog_posts).length > 0 && (
            <div className="section latestBlogs">
                <div className="container">
                    <h2>Latest Blog Posts</h2>
                    <div className="ltstBlogs">
                    {blog_posts.map(({ id, title, slug, image, created_at }) => {
                        return (<div className="postcolm">
                            <a href={route('blog.post.details', {slug})}>
                                <img src={(`/storage/uploads/blog/${image}`)} alt={(`${title}`)} />
                                <h6>{created_at}</h6>
                                <h4>{title}</h4>
                            </a>
                        </div>);
                        })}
                    </div>

                    <div className="btncntr"><Link href={route('blog.posts')} className="btn brdr-btn">View More <i className="fa fa-angle-right"></i></Link></div>
                </div>
            </div>
        )
    );
}
