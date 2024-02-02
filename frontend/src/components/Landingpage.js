
import React from 'react'
import { Link } from 'react-router-dom'
import workingprofessionals from "../images/wokingprofessionals.jpg"
import manlogo from "../images/manlogo.webp"
import "./landing.css"

const Landingpage = () => {
    return (
        <div>
            <section id="title" className="gradient-background">
                <div className="container">
                    <div className="container col-xxl-8 px-4 pt-5">
                        <div className="row flex-lg-row-reverse align-items-center g-5 pt-5">
                            <div className="col-10 col-sm-8 col-lg-6">
                                <img src={workingprofessionals} className="d-block mx-lg-auto img-fluid" alt="working profesnals" width="840" height="560" loading="lazy" />
                            </div>
                            <div className="col-lg-6">
                                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Get new and intersting jobs and connect with people all over the World</h1>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <button type="button" className="btn btn-light btn-lg px-4 me-md-2 mb-5" fdprocessedid="cohk1s">
                                        <Link className="nav-link p-0 text-dark" to="/login" >Login </Link>
                                    </button>
                                    <button type="button" className="btn btn-dark btn-lg px-4 mb-5" fdprocessedid="2415lv">
                                        <Link className="nav-link p-0 text-light" to="/register" >Sign Up </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features">
                <div className="container px-4 py-5" id="hanging-icons">
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" /> */}
                                {/* <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                </svg> */}
                            </div>
                            <div>

                                <h3 className="fs-2 text-body-emphasis">Easy to use.</h3>
                                <p>So easy to use, very friendly experiance.</p>
                            </div>
                        </div>

                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" className="bi bi-universal-access-circle" viewBox="0 0 16 16"> */}
                                {/* <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143Zm-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z" />
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z" />
                                </svg> */}
                            </div>
                            <div>
                                <h3 className="fs-2 text-body-emphasis">Accessable.</h3>
                                <p>Our website is used all over the world by many people so, easy to access it</p>
                            </div>
                        </div>

                        <div className="col d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" className="bi bi-arrow-through-heart" viewBox="0 0 16 16"> */}
                                {/* <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a21.86 21.86 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354l-1.5 1.5Zm2.893-4.894A20.419 20.419 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708L5.747 10.96Z" />
                                </svg> */}
                            </div>

                            <div>
                                <h3 className="fs-2 text-body-emphasis">Assurity of jobs.</h3>
                                <p>Find the job of your choice.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="testimonial">
                <div className="m-0">
                    <div className="p-5 text-center bg-body-tertiary">
                        <div className="container pt-5">
                            <h2 className="text-body-emphasis pb-5">"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work." </h2>
                            <img className="dog-img" src={manlogo} alt="manlogo" height="150px" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="footer" className="gradient-background">
                <footer className="row ">
                    <div className="col mb-3">
                        <Link to="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                            {/* <svg className="bi me-2" width="40" height="32"><use xlink:to="#bootstrap"></use></svg> */}
                        </Link>
                        <p className="text-body-secondary m-5">© Infinity Link</p>
                    </div>

                    <div className="col mb-3">
                    </div>
                    <div className="col mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2 decor">
                                <Link to="#" className="nav-link p-0 text-body-secondary">Home</Link>
                            </li>
                            <li className="nav-item mb-2 decor">
                                <Link to="#" className="nav-link p-0 text-body-secondary">Features</Link>
                            </li>
                            <li className="nav-item mb-2 decor">
                                <Link to="#" className="nav-link p-0 text-body-secondary">FAQs</Link>
                            </li>
                            <li className="nav-item mb-2 decor">
                                <Link to="#" className="nav-link p-0 text-body-secondary">About</Link>
                            </li>
                        </ul>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default Landingpage