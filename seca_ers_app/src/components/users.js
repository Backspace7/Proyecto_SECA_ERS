import React from 'react';
import { DateInput,
        List, 
        DateField,
        Datagrid, 
        Create, 
        TextField, 
        ReferenceField, 
        SimpleForm, 
        Edit,  
        TextInput,
        Show,
        SimpleShowLayout,
        EmailField  } from 'react-admin';



export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <EmailField source="email" />
            <ReferenceField source="auth0Id" reference="auth0s"><TextField source="id" /></ReferenceField>
            <ReferenceField source="googleId" reference="googles"><TextField source="id" /></ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <DateInput source="createdAt" />
            <DateInput source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput type="password" source="password" />
        </SimpleForm>
    </Create>
);

export const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <EmailField source="email" />
            <ReferenceField source="auth0Id" reference="auth0s"><TextField source="id" /></ReferenceField>
            <ReferenceField source="googleId" reference="googles"><TextField source="id" /></ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);