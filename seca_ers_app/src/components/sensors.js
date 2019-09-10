import React from 'react';
import {List, 
        Filter, 
        Datagrid, 
        Create, 
        TextField, 
        SimpleForm, 
        Edit, 
        TextInput,
        Show,
        SimpleShowLayout,
        ReferenceField,
        SelectInput,
        ReferenceInput,
        NumberField } from 'react-admin';

const SensorFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search" source="id" alwaysOn />
      <TextInput label="type" source="type" defaultValue=" type " />
      <TextInput label="suid" source="suid" defaultValue=" suid " />
    </Filter>
);

const SensorTitle = ({ record }) => {
    return <span>Sensor {record ? `"${record.description}"` : ''}</span>;
};

const redirect = (basePath, id, data) => '/sensors';

export const SensorList = props => (
    <List filters={<SensorFilter />} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <TextField source="suid" />
            <TextField source="location" />
            <TextField source="description" />
            <ReferenceField source="tuid" reference="sen-types">
                <TextField source="type" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const SensorEdit = props => (
    <Edit title={<SensorTitle />} {...props}>
        <SimpleForm redirect={redirect} >
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
            <TextInput source="suid" />
            <TextInput source="location" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const SensorCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
            <TextInput source="suid" />
            <TextInput source="location" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

export const SensorShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="suid" />
            <TextField source="location" />
            <TextField source="description" />
            <ReferenceField source="tuid" reference="sen-types">
                <TextField source="type" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);