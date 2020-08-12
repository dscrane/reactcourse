import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import { ComponentDetail } from './ComponentDetail';
import { ApprovalCard } from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <ComponentDetail
          author="Sam"
          timeAgo="Today at 4:00 PM"
          avatar={faker.image.avatar()}
          comment="Is it Friday yet??"
        />
      </ApprovalCard>
      <ApprovalCard>
        <ComponentDetail
          author="Alex"
          timeAgo="Today at 12:01 PM"
          avatar={faker.image.avatar()}
          comment="What should I have for lunch!"
        />
      </ApprovalCard>
      <ApprovalCard>
        <ComponentDetail
          author="Jane"
          timeAgo="Today at 2:30 AM"
          avatar={faker.image.avatar()}
          comment="I should be asleep!"
        />
      </ApprovalCard>
      <ApprovalCard>
        <ComponentDetail
          author="Sarah"
          timeAgo="Yesterday at 4:30 PM"
          avatar={faker.image.avatar()}
          comment="First post!"
        />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
