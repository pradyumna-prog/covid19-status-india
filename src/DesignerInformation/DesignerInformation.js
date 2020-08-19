import React from 'react';
import myimage from '../myphoto.jpg';
import {Grid, Card, CardContent} from '@material-ui/core';
import {SocialIcon} from 'react-social-icons';

const designerInfo = (props) =>{
    return(
        <Grid container className = "footer">
          <Grid item component = {Card} xs = {12} md = {3} className="content">
            <CardContent>
              <table>
                <tbody>
                <tr>
                  <td><img src = {myimage} alt = "Pradyumna" id = 'myimage'/></td>
                  <td id = "myname">&emsp;&emsp;Developed by: Pradyumna Tripathi</td>
                </tr>
                </tbody>
              </table>
              <SocialIcon url = "http://www.linkedin.com/in/pradyumna-prog" style = {{margin : '5px'}}/>
              <SocialIcon url = "https://github.com/pradyumna-prog" style = {{margin : '5px'}}/>
              <SocialIcon url = "mailto:pradyumnatripathi99@gmail.com" style = {{margin : '5px'}}/>
            </CardContent>
          </Grid>
        </Grid>
    );
}

export default designerInfo;