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
const redirect = (basePath, id, data) => '/crops-types';
const CropstypesFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search" source="id" alwaysOn />
      <TextInput label="name" source="name" placeholder=" name " />
      <TextInput label="information" source="information" placeholder=" information " />
    </Filter>
);


export const CropstypesCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>         
            <TextInput source="name" />
            <TextInput source="information" />
        </SimpleForm>
    </Create>
);

export const CropstypesEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput source="name" />
            <TextInput source="information" />
        </SimpleForm>
    </Edit>
);

export const CropstypesList = props => (
    <List filters={<CropstypesFilter/>} {...props}>
        <Datagrid rowClick="edit">
                <NumberField source="id" />
            <TextField source="name" />
            <TextField source="information" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);

export const CropstypesShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="information" />
            <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);