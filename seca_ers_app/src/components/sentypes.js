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
const redirect = (basePath, id, data) => '/sen-types';

const SentypesFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search" source="id" alwaysOn />
      <TextInput label="type" source="type" placeholder=" type " />
      <TextInput label="description" source="description" placeholder=" description " />
    </Filter>
);
export const SentypeEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput source="type" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const SentypeList = props => (
    <List filters={<SentypesFilter/>} {...props}>
        <Datagrid rowClick="edit">
        	<NumberField source="id" />
            <TextField source="type" />
            <TextField source="description" />
            <DateField source="createdAt" />
            
        </Datagrid>
    </List>
);
export const SentypeCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>         
            <TextInput source="description" />
            <TextInput source="type" />
        </SimpleForm>
    </Create>
);

export const SentypeShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="type" />
            <TextField source="description" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);