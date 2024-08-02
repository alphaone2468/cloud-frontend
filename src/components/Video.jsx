import 'cloudinary-video-player/cld-video-player.min.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Video() {
    const { id } = useParams();
    const [link, setLink] = useState('');
    const [des, setDes] = useState('');
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors

    useEffect(() => {
        if (id) {
            handleGetVideoLink(id);
        }
    }, [id]);

    async function handleGetVideoLink(id) {
        try {
            const response = await fetch("https://backend-nai0.onrender.com/api/v1/get-video-link", {
                method: "POST",
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setLink(data.videoLink);
            setDes(data.description);
        } catch (error) {
            console.error('Error fetching video link:', error);
            setError('Failed to load video. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="video-container">
            {loading ? (
                <p className="video-container__loading">Loading video...</p>
            ) : error ? (
                <p className="video-container__error">{error}</p>
            ) : link ? (
                <div className="video-container__video">
                    <iframe
                        src={link}
                        width="640"
                        height="360"
                        allow="autoplay"
                        className="video-container__iframe"
                        title="Video"
                    ></iframe>
                    <p className="video-container__description">{des}</p>
                </div>
            ) : (
                <p>No video available.</p>
            )}
        </div>
    );
}
