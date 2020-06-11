import React from 'react';
import {List, 
        Filter, 
        Datagrid, 
        Create,
        SimpleForm, 
        Edit, 
        Show,
        NumberField,
        DateField,
        NumberInput,
        DateInput,
        ReferenceInput,
        SelectInput,
        ReferenceField,
        TextField
        } from 'react-admin';

const redirect = (basePath, id, data) => '/informs';
	
var date = new Date();
const month = date.getMonth()+1;
const day = date.getDate();
const year = date.getFullYear();
var today = year+'-'+month+'-'+day;

const InformFilter = (props) => (
    <Filter {...props}>
        <NumberInput lavel="Tmax" source="Tmax"/>
        <NumberInput lavel="Tmin" source="Tmin"/>
        <NumberInput lavel="Tpro" source="Tpro"/>
        <NumberInput lavel="Rsol" source="Rsol"/>
        <ReferenceInput label="zona" source="zuid" reference="zones" allowEmpty>
          <SelectInput optionText="zuid" />
        </ReferenceInput>
    </Filter>
);
export const InformList = props => (
    <List filters={<InformFilter />} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="Tmax" />
            <NumberField source="Tmin" />
            <NumberField source="Tpro" />
            <NumberField source="Rsol" />
            <DateField source="createdAt" />
            <ReferenceField source="zuid" reference="zones">
                <TextField source="zuid" />
            </ReferenceField>
        </Datagrid>
    </List>
);



export const InformEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="Tmax" />
            <NumberInput source="Tmin" />
            <NumberInput source="Tpro" />
            <NumberInput source="Rsol" />
            <ReferenceInput source="zuid" reference="zones">
                <SelectInput optionText="zuid" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const InformShow = props => (
    <Show {...props}>
        <SimpleForm redirect={redirect}>
            <NumberField source="Tmax" />
            <NumberField source="Tmin" />
            <NumberField source="Tpro" />
            <NumberField source="Rsol" />
            <DateField source="Date" />
            <ReferenceField source="zuid" reference="zones">
                <TextField source="zuid" />
            </ReferenceField>
        </SimpleForm>
    </Show>
);

export const InformCreate = props => (
        
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <NumberInput source="Tmax" />
            <NumberInput source="Tmin" />
            <NumberInput source="Tpro" />
            <NumberInput source="Rsol" />
            <ReferenceInput source="zuid" reference="zones">
                <SelectInput optionText="zuid" />
            </ReferenceInput>
            <DateInput source="Date" defaultValue={today}  options={{ day: 'numeric' , year: 'numeric', month: 'numeric' }}/>
        </SimpleForm>
    </Create>
);