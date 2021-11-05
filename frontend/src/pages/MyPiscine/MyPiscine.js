import { React, useState, useEffect } from 'react';
import { Header, Footer } from 'components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import checkId from 'utils/checkId';
import './MyPiscine.scss';
import { useHistory } from 'react-router';
const getPiscineSubjectAPI = 'http://betti.kr:9000' + '/api/piscines';
const giscineTitle = 'Git Branch Piscine';
const giscineSubtitle = 'Git Branch에 대해 배워봅시다!';

const MyPiscine = ({ match, location }) => {
  const user_id = checkId(location);
  let piscine;
  if (user_id) piscine = location.state.piscine;

  const [userPiscineSubjectList, setUserPiscineSubjectList] = useState([]);
  const index = match.params.index.substring(0);

  const getUserPiscine = (id) => {
    axios
      .get(getPiscineSubjectAPI + '/' + piscine.piscine_id + '/subjects')
      .then((response) => {
        setUserPiscineSubjectList(response.data);
      })
      .catch((error) => {
        console.log(`getPiscineSubjectAPI 호출 실패!`);
      });
  };

  useEffect(() => {
    if (user_id) getUserPiscine(user_id);
  }, []);

  return (
    <div className="mypiscine-container">
      <Header />
      <div className="mypiscine-page ttemp">
        <div className="mypiscine-block">
          <div className="mypiscine-box">
            <h1 className="title">{giscineTitle}</h1>
            <h2 className="subtitle">{giscineSubtitle}</h2>
          </div>
          <div className="mypiscine-box">
            <div className="mypiscine-box-column">
              {userPiscineSubjectList.map((e, idx) => {
                console.log(e);
                const url = `/myPiscine/view/${index}-${idx}`;
                return (
                  <Link
                    to={{
                      pathname: url,
                      state: { user_id: user_id, subject: e },
                    }}
                  >
                    <div>
                      <h1>{e.name}</h1>
                      <h2>asdf</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPiscine;
