import * as React from 'react';
import { useParams } from 'react-router';

export default function ServicePage() {
    const { id } = useParams();
     
    return (
        <div>
            Service Page {id}
        </div>
    );
}