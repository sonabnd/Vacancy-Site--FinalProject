import SearchFilter from "./SearchFilter";
import "../css/Homepage.css";
import { IoIosMenu } from "react-icons/io";

const Homepage = () => {

  return (
    <>
      <div>
        <div className="homepage-container">
          <div className="menu">
            <div className="logo-img">
              <img src="src/img/logo.c9da023 (1).png" alt="logo" />
            </div>
            <span className="menu-icon"><IoIosMenu /></span>
          </div>
          <SearchFilter />
          <div className="filter-container">
            <select name="" id="">
              <option value="">Vəzifə</option>
              <option value="">Direktor</option>
              <option value="">Menecer</option>
              <option value="">Köməkçi</option>
            </select>
            <select name="" id="">
              <option value="">Maaş</option>
              <option value="">Direktor</option>
              <option value="">Menecer</option>
              <option value="">Köməkçi</option>
            </select>
            <select name="" id="">
              <option value="">Ərazi</option>
              <option value="">Direktor</option>
              <option value="">Menecer</option>
              <option value="">Köməkçi</option>
            </select>
            <button className="search-btn">Search</button>
          </div>
          <div className="advertisement-lists">
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price"></p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">600 AZN</p>
            </div>
            <div className="advertisement">
              <div className="advertisement-loqo">S</div>
              <div className="advertisement-position-company">
                <p>Help Desk Specialist</p>
                <span>Oil Company</span>
              </div>
              <p className="price">Razılaşma Yolu ilə</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
