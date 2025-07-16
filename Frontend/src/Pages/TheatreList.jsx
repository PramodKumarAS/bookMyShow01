import React, { useEffect, useState } from 'react';
import { Table, Button, message} from 'antd';
import DeleteTheatreModal from './DeleteTheatreModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllTheatresByOwner } from '../API/theatre';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/loaderSlice';
import TheatreFormModal from './TheatreFormModal';
import ShowModal from './ShowModal';
import { useNavigate } from 'react-router';

const TheatreList = () => {
    const  user  = useSelector((state) => state.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add"); 
    const [theatres, setTheatres] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();   

    const getData = async () => {
        try{
          if(user.user.role!=='Partner'){
            navigate('/home')
          }
          dispatch(showLoading());
          const response = await getAllTheatresByOwner({ owner: user.user._id });
          if(response.success){
            const allTheatres = response.allTheatresByOwner;
            setTheatres(
                allTheatres.map(function(item){
                return {...item, key: `theatre${item._id}`}
              })
            );
          }else{
            message.error(response.message)
          }
          dispatch(hideLoading())
  
        }catch(err){
          dispatch(hideLoading());
          message.error(err.message);
        }
      }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Status',
          dataIndex: 'isActive',
          render: (isActive) => {
            if(isActive){
                return `Approved`
            }else{
                return `Pending/ Blocked`
            }
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, data) => {
            return(
              <div className='d-flex align-items-center gap-10'>
                <Button onClick={() => {
                    setIsModalOpen(true);
                    setFormType("edit");
                    setSelectedTheatre(data)
                }}>
                    <EditOutlined/>
                </Button>
                <Button 
                onClick={ () => { 
                  setIsDeleteModalOpen(true); 
                  setSelectedTheatre(data); 
                  }}>
                <DeleteOutlined/>
                </Button>
                { data.isActive && <Button onClick={ () => { setIsShowModalOpen(true); setSelectedTheatre(data); }}>+ Shows</Button> }
              </div>
            )
          }
        },
      ];

      useEffect(() => {
        getData();
      }, [])

    return(
        <>
          <div className='d-flex justify-content-end'>
              <Button type="primary" onClick={() => { setIsModalOpen(true); setFormType("add") }}>Add Theatre</Button>
          </div>   
          <Table dataSource={theatres} columns={columns} />
          { isModalOpen && <TheatreFormModal isModalOpen={isModalOpen} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} setIsModalOpen={setIsModalOpen} formType={formType} getData={getData} /> }
          { 
            <DeleteTheatreModal
            isDeleteModalOpen={isDeleteModalOpen}
            selectedTheatre={selectedTheatre}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setSelectedTheatre={setSelectedTheatre}
            getData={getData}
        />
      }
          {
          isShowModalOpen && <ShowModal isShowModalOpen={isShowModalOpen} setIsShowModalOpen={setIsShowModalOpen} selectedTheatre={selectedTheatre}/>
        }
        </>
    );
}

export default TheatreList;