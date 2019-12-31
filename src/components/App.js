import React, { Component } from "react";
import Buttons from "../components/Buttons";
import CounterList from "./CounterList";
import { Button } from "antd";
import "./App.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { List, Avatar } from "antd";
import reqwest from "reqwest";
import { message, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const fakeDataUrl = "https://randomuser.me/api/?results=20&inc=name,gender,email,nat&noinfo";

class App extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 100) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  render() {
    return (
      <Layout>
        <Layout>
          <Sider>
            <Menu
              style={
                {
                  /*height:'1000px'*/
                }
              }
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode='inline'
              theme='dark'>
              <Menu.Item key='1'>
                <Icon type='pie-chart' />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='desktop' />
                <span>Option 2</span>
              </Menu.Item>
              <Menu.Item key='3'>
                <Icon type='inbox' />
                <span>Option 3</span>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='mail' />
                    <span>Navigation One</span>
                  </span>
                }>
                <Menu.Item key='5'>Option 5</Menu.Item>
                <Menu.Item key='6'>Option 6</Menu.Item>
                <Menu.Item key='7'>Option 7</Menu.Item>
                <Menu.Item key='8'>Option 8</Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='appstore' />
                    <span>Navigation Two</span>
                  </span>
                }>
                <Menu.Item key='9'>Option 9</Menu.Item>
                <Menu.Item key='10'>Option 10</Menu.Item>
                <SubMenu key='sub3' title='Submenu'>
                  <Menu.Item key='11'>Option 11</Menu.Item>
                  <Menu.Item key='12'>Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ height: window.innerHeight + "px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 0,
                margin: 0
              }}>
              <Layout>
                <Sider width={400}>
                  <div style={{ height: window.innerHeight + "px", background: "white"}}>
                    <div className='demo-infinite-container' style={{ height: "100%" }}>
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}>
                        <List
                          dataSource={this.state.data}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                                }
                                title={<a href='https://ant.design'>{item.name.last}</a>}
                                description={item.email}
                              />
                              <div>Content</div>
                            </List.Item>
                          )}>
                          {this.state.loading && this.state.hasMore && (
                            <div className='demo-loading-container'>
                              <Spin />
                            </div>
                          )}
                        </List>
                      </InfiniteScroll>
                    </div>
                  </div>
                </Sider>
                <Layout>
                  <Content style={{ margin: "0",height:window.innerHeight+'px' }}>
                    <div style={{ padding: 0, background: "#fff" }}>document</div>
                  </Content>
                </Layout>
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
