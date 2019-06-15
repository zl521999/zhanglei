import React from "react"

import logo from "./images/logo.png"

import "./login.less"

import { Form, Icon, Input, Button } from 'antd';



/* 
登录的一级路由
*/
class Login extends React.Component{



    handleSubmit=(event)=>{

        //阻止默认行为
        event.preventDefault();
        //收集输入的数据
        /*getFieldValue取出指定的值
        getFieldsValue 取出所有的值---是一个对象：里面有username，password
         */
        //统一去验证，自动的去validateFields上去取表单上所有的value
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //如果没有错误，验证成功
              console.log('登录成功');
            }
          });

    }

    //对密码进行自定义验证
    validatePwd=(rule,value,callback)=>{
        //console.log(rule,value,callback)
        value=value.trim();
        if(!value){
            callback("必须输入密码");//会指定要显示的提示文本                
        }else if(value.length<6){
            callback("密码长度不能小于6位");
        }else if(value.length>16){
            callback("密码长度不能大于16位");
        }
        else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是英文，数字或下划线");
        }else {
            callback();//不传代表验证通过
        }


    }

    


    render (){

        const { getFieldDecorator } = this.props.form;

        
        
        return (
            <div className="login">
                
                <header className="login-header" >
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>

                <section className="login-content">
                    <h2>用户登录</h2>
                    
                    <Form onSubmit={this.handleSubmit} className="login-Form">
                    <Form.Item>
                        {getFieldDecorator('username',{//配置对象
                            //指定配置对象的初始值为空，
                            initialValue:"",
                            //声明式验证，使用已有的规则去验证
                            rules: [{ required: true, whitespace:true, message: '请输入用户名' },
                                    { min: 4, message: '用户名不能小于4位' },
                                    { max: 12, message: '用户名不能大于12位' },
                                    { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线' },

                                ]
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )
                        }
                    </Form.Item>

                    <Form.Item>
                            {getFieldDecorator('password',{
                                 //指定配置对象的初始值为空，
                                initialValue:"",
                                rules:[
                                    {validator:this.validatePwd}
                                ]
                            })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )
                        }
                    </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-Form-button">
                                登录
                            </Button>
                        </Form.Item>
                        
                    </Form>

                </section>

            </div>
        )
    }
}

/* 
组件标签是组件的实例对象
包装一个组件，生成一个新的组件
Form.create()返回的一个函数，包装一个form组件生成一个新的组件
form组件包含了<Form>
*/

/* 高阶函数，返回的值是函数,
高阶组件：本质是一个函数，接收一个组件，返回一个新的组件
新的组件会给被包装组件传递特定的属性
*/
/* 现在Login标签被WrapperLogin包含着，所以用WrapperLogin
暴露，渲染的也是WrapperLogin组件标签
*/
//生成的新组件：Form(Login)
const WrapperLogin=Form.create()(Login);
/* 使用默认暴露的方式，所以暴露的名字在引入的时候可以随便写 */
export default WrapperLogin;