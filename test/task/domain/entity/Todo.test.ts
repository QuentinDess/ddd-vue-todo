import { describe, it, expect, beforeEach } from 'vitest'
import { Todo } from '@/task/domain/entity/Todo'
import { TodoTitle } from '@/task/domain/value_objects/TodoTitle'
import { TodoDescription } from '@/task/domain/value_objects/TodoDescription'
import { TodoStatus } from '@/task/domain/value_objects/TodoStatus'

describe('Todo Entity', () => {
  let todo: Todo

  beforeEach(() => {
    todo = Todo.create(
      TodoTitle.create('Test Todo'),
      TodoDescription.create('Description of test todo'),
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    )
  })

  it('should reconstitute a todo from existing state', () => {
    const reTodo = Todo.reconstitute(
      todo.id,
      TodoTitle.create('ReTodo'),
      TodoDescription.create('ReDescription'),
      todo['completionWindow'],
      TodoStatus.IN_PROGRESS
    )
    expect(reTodo.id).toBe(todo.id)
    expect(reTodo.title).toBe('ReTodo')
  })

  it('should create a todo with correct initial values', () => {
    expect(todo.title).toBe('Test Todo')
    expect(todo.description).toBe('Description of test todo')
    expect(todo.status).toBe(TodoStatus.IN_PROGRESS)
    expect(todo.id).toBeDefined()
    expect(todo.pullDomainEvents()).toHaveLength(1)
  })

  it('should update title and push TodoUpdatedEvent', () => {
    todo.updateTitle('Updated Title')
    expect(todo.title).toBe('Updated Title')
    const events = todo.pullDomainEvents()
    expect(events.some((e) => e.constructor.name === 'TodoUpdatedEvent')).toBe(true)
  })

  it('should not allow updating completed todo', () => {
    todo.complete()
    expect(() => todo.updateTitle('Fail Update')).toThrowError()
  })

  it('should complete the todo and push TodoUpdatedEvent', () => {
    todo.complete()
    expect(todo.status).toBe(TodoStatus.COMPLETED)
    const events = todo.pullDomainEvents()
    expect(events.some((e) => e.constructor.name === 'TodoUpdatedEvent')).toBe(true)
  })

  it('should abort the todo and push TodoUpdatedEvent', () => {
    todo.abort()
    expect(todo.status).toBe(TodoStatus.ABORTED)
    const events = todo.pullDomainEvents()
    expect(events.some((e) => e.constructor.name === 'TodoUpdatedEvent')).toBe(true)
  })

  it('should throw error if deleting completed todo', () => {
    todo.complete()
    expect(() => todo.delete()).toThrowError()
  })

  it('should delete todo if not completed', () => {
    todo.delete()
    const events = todo.pullDomainEvents()
    expect(events.some((e) => e.constructor.name === 'TodoDeletedEvent')).toBe(true)
  })
})
