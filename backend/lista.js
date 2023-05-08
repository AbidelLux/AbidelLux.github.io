class ListaNodo {
    constructor(text,archivo,fecha,hora) {
      this.text = text;
      this.archivo = archivo;
      this.fecha= fecha;
      this.hora= hora;
      this.siguiente = null;
    }
}
  
  class ListaCircular {
    constructor() {
      this.head = null;
      this.tail = null;
      this.largo = 0;
    }
  
    añadirFinal(text,archivo,fecha,hora) {
      const newNode = new ListaNodo(text,archivo,fecha,hora);
      if (this.head === null) {
        this.tail = newNode;
        this.head = newNode;
      } else {
        newNode.siguiente = this.head;
        this.tail.siguiente = newNode;
        this.head = newNode;
      }
      this.largo++;
    }
  
    añadirInicio(text,archivo,fecha,hora) {
      const newNode = new ListaNodo(text,archivo,fecha,hora);
      if (this.tail === null) {
        newNode.siguiente = newNode;
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.siguiente = this.head;
        this.tail.siguiente = newNode;
        this.tail = newNode;
      }
      this.largo++;
    }
  
    removerFinal() {
      if (this.head === null) {
        return null;
      } else {
        const value = this.head.archivo;
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        } else {
          this.tail.siguiente = this.head.siguiente;
          this.head = this.head.siguiente;
        }
        this.largo--;
        return value;
      }
    }
  
    removerInicio() {
      if (this.tail === null) {
        return null;
      } else {
        const value = this.tail.archivo;
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        } else {
          let currentNode = this.head;
          while (currentNode.siguiente !== this.tail) {
            currentNode = currentNode.siguiente;
          }
          currentNode.siguiente = this.head;
          this.tail = currentNode;
        }
        this.largo--;
        return value;
      }
    }
    
    // Otros métodos
    
    insertarIndice(text,fecha,hora, index) {
        if (index < 0 || index > this.largo) {
          return false;
        } else if (index === 0) {
          this.addToHead(text,fecha,hora, index);
          return true;
        } else if (index === this.largo) {
          this.addToTail(text,fecha,hora, index);
          return true;
        } else {
          const newNode = new ListaNodo(text,archivo,fecha,hora);
          let currentNode = this.head;
          for (let i = 1; i < index; i++) {
            currentNode = currentNode.siguiente;
          }
          newNode.siguiente = currentNode.siguiente;
          currentNode.siguiente = newNode;
          this.largo++;
          return true;
        }
      }
    
      removerIndice(index) {
        if (index < 0 || index >= this.largo) {
          return false;
        } else if (index === 0) {
          this.removeFromHead();
          return true;
        } else if (index === this.largo - 1) {
          this.removeFromTail();
          return true;
        } else {
          let currentNode = this.head;
          for (let i = 1; i < index; i++) {
            currentNode = currentNode.siguiente;
          }
          const removedNode = currentNode.siguiente;
          currentNode.siguiente = removedNode.siguiente;
          this.largo--;
          return true;
        }
      }
    
      buscar(archivo) {
        let currentNode = this.head;
        do {
          if (currentNode.archivo === archivo) {
            return currentNode;
          }
          currentNode = currentNode.siguiente;
        } while (currentNode !== this.head);
        return null;
      }

      toGraph() {
        let graph = "\n";
        graph += "  rankdir=\"LR\";\n";
        graph += "  node [style=rounded shape=box];\n";
    
        let currentNode = this.head;
        for (let i = 0; i < this.largo; i++) {
          graph += `  node${i} [label="Acción: ${currentNode.text} \\n Fecha: ${currentNode.fecha} \\n Hora: ${currentNode.hora}"];\n`;
          currentNode = currentNode.siguiente;
        }
        for (let i = 0; i < this.largo-1; i++) {
          graph += `  node${i} -> node${i + 1};\n`;
        }
        graph += `  node${this.largo - 1} -> node0;\n`;
    
        graph += "\n";
        return graph;
      }
    
      forEach(callback) {
        let currentNode = this.head;
        do {
          callback(currentNode.archivo);
          currentNode = currentNode.siguiente;
        } while (currentNode !== this.head);
      }
    }
