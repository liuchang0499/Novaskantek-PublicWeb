import React from 'react';
import { render } from 'react-dom';
import mobx from 'mobx';
import { observer, inject, toJS } from 'mobx-react';
import request from 'superagent';
import _Row from 'antd/lib/row';
import _Col from 'antd/lib/col';
import _Card from 'antd/lib/card';

const heading= '设计集成';
const label_case= '继承案例';
const label_service= '服务流程 ';
const label_introduction= '项目介绍';
const caseone= '案例一';
const casetwo= '案列二';
const casethree= '案列三';
const casefour= '案例四';

const styles = {
  headingfont:{
    fontWeight: 'bold',
    fontSize: '28px'
  },
  straightline_long: {
    position: 'relative',
    content: '',
    marginBottom: '40px',
    height: '3px',
    backgroundColor: '#BFBFBF',
  },
  conpsize:{
    margin:'0',
    position:'relative',
    float:'left',
    width:'300px',
    height:'180px'
  },
  title:{
    fontSize:'16px',
    marginBottom: '10px',
    marginTop:'10px'
  },
  discription:{
    fontSize:'14px',
    marginBottom: '5px',
    marginTop:'5px',
  }
}

const SampleSpots = (inject('store')(function SampleSpots (props){
  function render(){
    return(
      <div>
        { props.store.sampleList.map(function(num){
          return(
            <_Card style={{  }} bordered={false} bodyStyle={{ padding: 0 }}>
              <div className="bg_gray">
                <_Col span={6}><img src={ num.heroImage.url} style={styles.conpsize }/></_Col>
                <_Col span={17} offset={1}>
                  <p style={ styles.title }>{ num.IntegrationName }</p>
                  <p style={ styles.discription}>{num.IntegrationDescription}</p>
                </_Col>
              </div>
            </_Card>
          )
        }) 
      }   
      </div>
      )
    }
    return observer({
    render,
  });
}));


const SamplePresent =(inject('store')(function SamplePresent (props){
  function componentDidMount(){
    console.log('Samplepresent mount', this);
    console.log('fetchApplication');
    request.get('/api/integration')
      .end(function(err, res){
      console.log('list add successful');
      props.store.setSampleList(res.body);
    })
  }

  function render(){
    return (
	     <div style= {{ 'paddingTop': '120px', 'paddingBottom':'60px' }}>
        <_Row>
          <_Col span={16} offset={4}>
            <_Col style={styles.headingfont} span={21}>{ heading }</_Col>
            <_Col span={1}><a>{ label_case }</a></_Col>
            <_Col span={1}><a>{ label_service}</a></_Col>
            <_Col span={1}><a>{ label_introduction }</a></_Col>
          </_Col>
        </_Row>
        <_Row>
          <_Col span={16} offset={4}>
           {/* <_Row>
              <_Col style={ styles.straightline_long } ></_Col>
            </_Row>
            <_Row >
              <_Col><SampleSpots casenum={ caseone }/></_Col>
            </_Row>
            <_Row >
              <_Col><SampleSpots casenum={ casetwo }/></_Col>
            </_Row>
            <_Row >
              <_Col><SampleSpots casenum={ casethree }/></_Col>
            </_Row>
            <_Row >
              <_Col><SampleSpots casenum={ casefour }/></_Col>
            </_Row>*/}
            <_Row >
              <_Col><SampleSpots/></_Col>
            </_Row>
          </_Col>
        </_Row>
     </div>
    )
  }
   return observer({
    componentDidMount,
    render,
  });
}));
export default SamplePresent;