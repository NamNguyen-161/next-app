import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailProps {
}

export default function PostDetail (props: PostDetailProps) {
    const route = useRouter()
    return (
        <div>
            Page details: {JSON.stringify(route.query)}
        </div>
    );
}
