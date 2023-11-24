import React from 'react'
import "./user.css"

function user() {
  return (
    <div>
       <div id="profile" className="row g-5 ">
       
        <div className="col-md-7 col-lg-8">
          <form className="needs-validation" novalidate="">
            <div className="row g-3">

              <div className="profile-img">
                <label for="profile" className="form-label">Profile Picture<span className="text-body-secondary" >(Optional)</span></label>
                <input type="image" className="form-control"  fdprocessedid="hiekzo" />
              </div><br/>

              <div className="col-sm-6">
                <label for="firstName" className="form-label">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required="" fdprocessedid="6l0l"/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
  
              <div className="col-sm-6">
                <label for="lastName" className="form-label">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required="" fdprocessedid="y0b2fc"/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
  
              <div className="col-12">
                <label for="username" className="form-label">Username</label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input type="text" className="form-control" id="username" placeholder="Username" required="" fdprocessedid="gg08nh"/>
                <div className="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>
  
              <div className="col-12">
                <label for="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" fdprocessedid="hiekzo"/>
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
  
              <div className="col-12">
                <label for="Number" className="form-label">Contact Number</label>
                <input type="number" className="form-control" id="Number" placeholder="98******76" required="" fdprocessedid="wgk5dq"/>
                <div className="invalid-feedback">
                  Please enter your valid contact number
                </div>
              </div>
  
              <div className="col-12">
                <label for="job" className="form-label">Type of job you are interest <span className="text-body-secondary"></span></label>
                <input type="text" className="form-control" id="job" placeholder="Enter job that suits you best" fdprocessedid="ohexoo"/>
              </div>
  
              <div className="col-md-5">
                <label for="country" className="form-label">Country</label>
                <select className="form-select" id="country" required="" fdprocessedid="0vzahg">
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
  
              <div className="col-md-4">
                <label for="state" className="form-label">State</label>
                <select className="form-select" id="state" required="" fdprocessedid="q3ebjo">
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
  
              <div className="col-md-3">
                <label for="zip" className="form-label">Pin Code</label>
                <input type="number" className="form-control" id="zip" placeholder="22****7" required="" fdprocessedid="qy0hai"/>
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
  
            <hr className="my-4"/>
  
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="save-info"/>
              <label className="form-check-label" for="save-info">Save this information for next time</label>
            </div>
  
            <hr className="my-4"/>
  
  
            <button className="w-100 btn btn-dark btn-lg m-2" type="reset" fdprocessedid="xcb70n">Reset</button>
            <button className="w-100 btn btn-dark btn-lg m-2 mb-4" type="submit" fdprocessedid="xcb70n">Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default user
