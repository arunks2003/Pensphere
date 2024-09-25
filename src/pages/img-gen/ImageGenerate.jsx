import Layout from '@/file-components/layout/Layout';
import React, { useEffect, useState } from 'react';
import './styles.css'

import axios from 'axios';
import OpenAI from 'openai';

import { Client } from "@gradio/client";

const ImageGenerate = () => {

    const [url, setUrl] = useState('');
    const generateImage = async () => {
        const client = await Client.connect("black-forest-labs/FLUX.1-schnell");
        const result = await client.predict("/infer", {
            prompt: `${prompt}`,
            seed: 0,
            randomize_seed: true,
            width: 256,
            height: 256,
            num_inference_steps: 1,
        });

        const imageUrl = result[0]?.path; // Use optional chaining to prevent errors
        console.log(imageUrl);

    };
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your image generation logic here
        console.log('Generating image for prompt:', prompt);
        generateImage()
    };

    return (
        <Layout>
            <div className="image-generator-container">
                <h1 className="title">Image Generator</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <textarea
                        className="textarea"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a description for the image..."
                    />
                    <button onClick={handleSubmit} className="submit-button" type="submit">
                        Generate Image
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ImageGenerate;


