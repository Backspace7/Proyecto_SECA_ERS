import React from 'react';
import {List, 
        NumberField,
        DateField,
        Filter, 
        Datagrid, 
        Create, 
        TextField, 
        SimpleForm, 
        Edit, 
        TextInput,
        Show,
        SimpleShowLayout } from 'react-admin';
const redirect = (basePath, id, data) => '/crops-stages';
const CropsstagesFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search" source="id" alwaysOn />
      <TextInput label="name" source="name" placeholder=" name " />
      <TextInput label="description" source="description" placeholder=" description " />
      <TextInput label="family" source="family" placeholder=" family " />
    </Filter>
);

export const CropsstagesCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>         
            <TextInput source="name" />
            <TextInput source="description" />
            <TextInput source="family" />
        </SimpleForm>
    </Create>
);

export const CropsstagesEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput source="name" />
            <TextInput source="description" />
            <TextInput source="family" />
        </SimpleForm>
    </Edit>
);

export const CropsstagesList = props => (
    <List filters={<CropsstagesFilter/>} {...props}>
        <Datagrid rowClick="edit">
                <NumberField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="family" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);

export const CropsstagesShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="family" />
            <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);