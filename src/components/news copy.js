import React, {Component} from "react";
import { Container, Row, Col } from 'reactstrap';

class News extends Component{
    render(){
        return(
            <Container>
              <h1>Tin tức nổi bậc</h1>
              <p>Thông tin 1</p>
              <p>Thông tin 2</p>
              <p>Thông tin 3</p>
              <p>Thông tin 4</p>
            </Container>
        )
    }
}

export default News;