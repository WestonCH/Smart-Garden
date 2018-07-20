import React, { Component,PropTypes } from 'react';
//antd
import { Modal, Table, Icon, Switch, Radio, Form, Divider, Input, Layout, Row, Col, Popconfirm, Button, List, Avatar, Select } from 'antd';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
const { Header,Content,Footer,Sider } = Layout;
//axios
import axios from "axios/index";
//列表样式用
const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const footer = () => 'User Table';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };
//redux中取出持久化数据
const theData = localStorage.getItem('userID');
//本地Icon
import gardenIcon from '../img/gardenIcon.png';
import humiditySensorIcon from '../img/humiditySensor.png';
import temperatureSensorIcon from '../img/temperatureSensor.png';
import monitorSensorIcon from '../img/monitorSensor.png';

const ButtonGroup = Button.Group;
const Option = Select.Option;

function handleChangeSelect(value) {
    console.log(`selected ${value}`);
  }


class UserSensorPage extends Component{
    constructor(){
        super();
        this.state = {
          gardens: [],//存放garden
          sensors:[],//存放sensor
          bordered: false,
          pagination,
          size: 'default',
          expandedRowRender,
          title: undefined,
          showHeader,
          footer,
          rowSelection: {},
          scroll: undefined,
          addmodalVisible: false,
          updatemodalVisible: false,
          modalVisible: false,
          targetGardenId:-1,
        }
    }

    
    //添加传感器对话框控制函数
    showAddModal = (gardenId) => {
        this.setState({
        modalVisible: true,
        targetGardenId:gardenId,
        });
        console.log("targetGardenId:",gardenId);
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    }


    //根据登录的userId从后端取出对应的gardens进行初始化
    componentWillMount(){
        var params= new URLSearchParams();
        console.log("LoginUserId:",theData);
        axios.get(`http://localhost:8080/garden/getByUserId`,{params:{'userId':theData}})
            .then(res => {
                this.setState({
                    gardens: res.data,
                });
        })
    } 
    //根据选择的garden显示其拥有的sensor
    handleSensorByGarden = (gardenId) => {
        var params= new URLSearchParams();
        console.log("GardenId:",gardenId);
        axios.get(`http://localhost:8080/sensors/getSensorByGardenId`,{params:{'gardenId':gardenId}})
            .then(res => {
                this.setState({
                    sensors: res.data,
                });
        });
        axios.get(`http://localhost:8080/garden/getByGardenId`,{params:{'gardenId':gardenId}})
        .then(res=>{
        console.log("gardenlength:",res.data.length);
        console.log("gardenwidth:",res.data.width);
    })
    }
    //判断传感器Icon函数
    handleSensorIcon = (sensorType) => {
        if(sensorType==1)
        {
            return humiditySensorIcon;
        }
        else if(sensorType==2)
        {
            return temperatureSensorIcon;
        }
        else
        {
            return monitorSensorIcon;
        }
    }
    //根据选择的garden和sensor信息添加sensor
    handleAddSensor = (gardenId) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                
                console.log('Received values of form: ', values);
                
                var params= new URLSearchParams();
                params.append('positionX',values.positionX);
                params.append('positionY',values.positionY);
                params.append('sensorType',values.sensorType);
                params.append('gardenId',gardenId);
                if((values.positionX!=null)&&(values.positionY!=null)&&(values.sensorType!=null)&&(gardenId!=null))
                {
                  axios.post('http://localhost:8080/sensors/addSensorWithGardenId',params).then((res)=>{
                    console.log(res.data);
                    axios.get(`http://localhost:8080/sensors/getSensorByGardenId`,{params:{'gardenId':gardenId}})
                    .then(res => {
                        this.setState({
                            sensors: res.data,
                        });
                    })
                    alert('add sensor successfully');
                    //更新redux信息
                  }).catch(err=>{
                    alert("unexpected error in add sensor ");
                  });
                }
                else
                {
                  alert('add sensor failed');
                }
    
                
            }
        });
    }
    //根据选择的sensorId删除指定的sensor
    handleDeleteSensor = (sensorId) => {
        //获取修删除sensor所在的gardenId
        axios.get(`http://localhost:8080/sensors/getSensorBySensorId`,{params:{'sensorId':sensorId}})
                    .then((response)=>{
                        var updateGardenId=response.data.garden.gardenId;

                        var params= new URLSearchParams();
                        params.append('sensorId',sensorId);
                        axios.post('http://localhost:8080/sensors/deleteSensorBySensorId',params).then((res)=>{
                        console.log(res.data);
                        axios.get(`http://localhost:8080/sensors/getSensorByGardenId`,{params:{'gardenId':updateGardenId}})
                            .then(res => {
                                this.setState({
                                    sensors: res.data,
                                });
                            })
                        alert('delete successfully');
                        //更新redux信息
                        });
                    });
    }
    //根据选择的sensorId获得其state
    handleGetSensorState = (sensorId) => {
        axios.get(`http://localhost:8080/sensors/getSensorBySensorId`,{params:{'sensorId':sensorId}})
                    .then((response)=>{
                        var sensorState=response.data.sensorState;
                        console.log("sensorState:",sensorState);
                        if(sensorState==0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    });
    }
    //根据选择的sensorId更改其state
    handleUpdateSensorState = (sensorId) => {
        axios.get(`http://localhost:8080/sensors/getSensorBySensorId`,{params:{'sensorId':sensorId}})
                    .then((response)=>{
                        

                        var params= new URLSearchParams();
                        params.append('sensorId',response.data.sensorId);
                        if(response.data.sensorState==0)
                        {
                            params.append('sensorState',1); 
                        }
                        else
                        {
                            params.append('sensorState',0); 
                        }
                        
                        
                        axios.post('http://localhost:8080/sensors/modifySensorState',params).then((res)=>{
                            console.log("update state successfully");
                        });
                    });
    }

    render(){
        //form样式
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const state = this.state;

        return(
            <Layout>
                <Layout>
                    <Sider width={300} style={{ background: '#fff'}} height={window.innerHeight}>            
                        <div className="garden-list">
                            <List style={{textAlign:'center'}}
                                header="Garden"
                                dataSource={this.state.gardens}
                                renderItem={item => (
                                <List.Item key={item.gardenId} 
                                    actions={[<ButtonGroup>
                                                <Button onClick={()=>this.handleSensorByGarden(item.gardenId)}>select</Button>,
                                                <Button onClick={()=>this.showAddModal(item.gardenId)}>add</Button>
                                            </ButtonGroup>]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={gardenIcon} />}
                                    title={<a>{item.gardenName}</a>}
                                    description={"length:"+item.length+" width:"+item.width}
                                    />
                                </List.Item>
                                
                                )}
                            >
                                <Modal title="Add Sensor" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                    <Form className="addSensor-form" onSubmit={()=>this.handleAddSensor(this.state.targetGardenId)}>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="PositionX"
                                        >
                                            {getFieldDecorator('positionX', {
                                                    rules: [{ required: true, message: 'Please input positionX!', whitespace: true }],
                                                })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="PositionX"
                                                type="positionX"
                                                required
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="PositionY"
                                        >
                                            {getFieldDecorator('positionY', {
                                                    rules: [{ required: true, message: 'Please input positionY!', whitespace: true }],
                                                })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="PositionY"
                                                type="positionY"
                                                required
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout} 
                                            label="SensorType"
                                        >
                                            {getFieldDecorator('sensorType', {
                                                    rules: [{ required: true, message: 'Please select sensorType!', whitespace: true }],
                                                })(
                                                // <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                // placeholder="SensorType"
                                                // type="sensorType"
                                                // required
                                                // />
                                                <Select style={{ width: 120 }} onChange={handleChangeSelect}>
                                                <Option value="1">Humidity sensor</Option>
                                                <Option value="2">Temperature sensor</Option>
                                                <Option value="3">Monitor sensor</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                        
                                        <FormItem>
                                            <Row>
                                            <Col span="8"></Col>
                                            <Col span="8">
                                                <Input type="submit" value="Add"/>
                                            </Col>
                                            <Col span="8"></Col>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                </Modal>
                                {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                                )}
                            </List>
                        </div>
                    </Sider>
                    <Content style={{minHeight:window.innerHeight}}>
                        
                    </Content>
                    <Sider width={300} style={{ background: '#fff'}} height={window.innerHeight}>
                        <div className="sensors-list">
                            <List style={{textAlign:'center'}}
                                header="Sensor"
                                dataSource={this.state.sensors}
                                renderItem={item => (
                                <List.Item key={item.sensorId}
                                           actions={[
                                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={Boolean(item.sensorState)} onChange={()=>this.handleUpdateSensorState(item.sensorId)} />,
                                           <Button type="danger" icon="minus" onClick={()=>this.handleDeleteSensor(item.sensorId)}/>
                                           ]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={this.handleSensorIcon(item.sensorType)} />}
                                    title={<a>{"Sensor:"+item.sensorId}</a>}
                                    description={"positionX:"+item.positionX+" positionY:"+item.positionY}
                                    />
                                </List.Item>
                                )}
                            >
                                {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                                )}
                            </List>
                        </div>
                    </Sider>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>传感器管理</Footer>
            </Layout>
        );
    }
}

const WrappedUserSensorPage = Form.create()(UserSensorPage);
export default WrappedUserSensorPage;