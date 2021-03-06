import React, {useState, useEffect} from "react"
import APIManager from "../Modules/APIManager"
import CharacterNavBar from "../NavBar/CharacterNavBar"
import {Card, Form, FormControl, Row} from "react-bootstrap"
import SpellCardNew from "./SpellCardNew"

const SpellBookNew = props => {
    const [spells, setSpells] = useState([])
    const [filterSpells, setFilterSpells] = useState([])


    useEffect(() =>{
        APIManager.GetAll(sessionStorage.spellType).then((response) => {
            
            setSpells(response)})

    }, [])

    const handleSearchChange = evt => {
       console.log(spells)
        let searchEvent = evt.target.value
        searchEvent = searchEvent.toUpperCase()
        let  filteredSpells = spells.filter(spell => 
            

            spell.name.toUpperCase().includes(searchEvent) ? true:  false
            
        
        )

        
       
       
        if(searchEvent == ""){
            filteredSpells = []
        }

        
      setFilterSpells(filteredSpells)
        
    }
    return(
        <>
        <CharacterNavBar {...props} />
        <Form inline className="searchForm">
            <FormControl type="text" placeholder="Search" className=" mr-sm-2  spellNewSearchBar" onChange={handleSearchChange}  />
            
        </Form>
        <Row sm="6" className="spellCardNewRow">
        {filterSpells.map(spell => 
            <SpellCardNew  spell={spell} {...props} /> )}
            </Row>
        </>
    )
}

export default SpellBookNew