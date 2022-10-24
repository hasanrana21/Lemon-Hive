import { useRouter } from 'next/router';
import React from 'react';

const Details = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            <h3>this is conference details page/ {id}</h3>
        </div>
    );
};

export default Details;