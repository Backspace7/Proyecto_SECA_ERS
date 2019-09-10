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
        NumberField,
        SelectInput,
        ReferenceInput,
        DateField,
        NumberInput
        } from 'react-admin';

const redirect = (basePath, id, data) => '/records';

const RecordFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Tipo" source="tuid" alwaysOn />
      <TextInput label="Sensor" source="suid" placeholder=" suid " />
    </Filter>
);

export const RecordList = props => (
    <List filters={<RecordFilter />} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="dat" />
            <DateField source="createdAt" showTime/>
            <DateField source="updatedAt" />
            <ReferenceField source="suid" reference="sensors">
                <TextField source="suid" />
            </ReferenceField>
            <ReferenceField source="tuid" reference="sen-types">
                <TextField source="type" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const RecordEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="dat" />
            <ReferenceInput source="suid" reference="sensors">
                <SelectInput optionText="suid" />
            </ReferenceInput>
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const RecordCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <NumberInput source="dat" />
            <ReferenceInput source="suid" reference="sensors">
                <SelectInput optionText="suid" />
            </ReferenceInput>
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const RecordShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="dat" />
            <NumberField source="suid" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);