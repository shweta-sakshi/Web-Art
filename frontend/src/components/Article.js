import React from 'react';
import './Article.css';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BrushIcon from '@mui/icons-material/Brush';
import Nav from './Articlenav.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//for upload button styling
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}, ({ theme }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: "#02367B",
    '&:hover': {
        backgroundColor: "#006CA5",
    },
}));


const Article = () => {
    const [value, setValue] = React.useState('');
    return (
        <>
            <Nav />
            <div className='article'>
                {/* <div className="App">
                    <h2>Add Image:</h2>
                    <input type="file" onChange={handleChange} />
                    <img src={file} alt='img' />
                </div> */}

                {/* start */}

                <div class="article-content">
                    <div class="image">
                        <div class="image__placeholder">
                            <div className='photo'>
                                {/* <svg role="none"  class="article-editor-cover-image__placeholder-illustration" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" data-supported-dps="64x64" data-test-icon="image">
                                        <svg display="var(--hue-web-svg-display-dark)">
                                            <image href="https://static.licdn.com/aero-v1/sc/h/3v0qqn0qg9h47wg81rum0twek" x="0" y="0" width="64" height="64"></image>
                                        </svg> */}
                                <svg display="var(--hue-web-svg-display-light)">
                                    <image href="https://static.licdn.com/aero-v1/sc/h/8x7kwtluy3rlydstzy8b6tywc" x="0" y="0" width="64" height="64"></image>
                                </svg>
                                {/* </svg> */}
                            </div>
                            <p class="image__placeholder-description">
                                We recommend uploading or dragging in an image that is <strong>1920x1080 pixels</strong>
                            </p>
                            <Stack style={{ marginLeft: "119px", marginBottom: "50px" }} spacing={2} direction="row">
                                <Button style={{ color: '#808080', border: '1px solid #808080', borderRadius: 16 }} component="label" variant="outlined" startIcon={<FileUploadIcon />}>
                                    Upload From Computer
                                    <VisuallyHiddenInput type="file" />
                                </Button>

                                <VisuallyHiddenInput type="button" value={'test'} />

                                <Button style={{
                                    '&:hover': {
                                        backgroundColor: "black",
                                    },
                                    color: '#808080',
                                    border: '1px solid #808080',
                                    borderRadius: 16
                                }}
                                    component="label" variant="outlined" startIcon={<BrushIcon />}
                                >
                                    Create a Design
                                </Button>
                            </Stack>
                        </div>
                    </div>

                    {/* title and heading */}
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    <ReactQuill onChange={setValue} />
                </div>
                {/* end */}
            </div>
        </>
    )
}

export default Article