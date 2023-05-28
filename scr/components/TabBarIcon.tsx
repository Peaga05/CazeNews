import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { View } from 'react-native';

function TabBarIcon(props: { name: any; }) {
  let icon;
  switch (props.name) {
    case 'TabNoticias':
      icon = faNewspaper
      break;
    case 'TabCadNoticias':
       icon = faPlusCircle;
      break;
  }
  return (
    <View>
        {icon != null &&
            <FontAwesomeIcon
                icon={icon}
                size={20} 
                color={"black"}
            />
        } 
    </View>
  ) 
}
export default TabBarIcon;
