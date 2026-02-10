"use client";

import { useState } from "react";

import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  HStack,
  Input,
  Select,
  Switch,
  Text,
  VStack,
} from "@/ui";

const selectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export default function DesignSystemPage() {
  const [selectValue, setSelectValue] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <Box minHeight="screen" bg="neutral-50" padding="lg">
      <Grid columns={2} gap="lg" templateColumns="1fr 4fr">
        <VStack gap="lg">
          {/* Color Palette */}
          <Card variant="elevated" padding="lg">
            <Text variant="h3">Color Palette</Text>
            <VStack gap="sm">
              <VStack gap="xs" align="start">
                <Text variant="caption">Primary Colors:</Text>
                <HStack gap="xs">
                  <div className="w-15 h-15 bg-primary rounded-md shadow-sm" />
                  <div className="w-15 h-15 bg-secondary rounded-md shadow-sm" />
                  <div className="w-15 h-15 bg-accent rounded-md shadow-sm" />
                </HStack>
              </VStack>
              <VStack gap="xs" align="start">
                <Text variant="caption">Status Colors:</Text>
                <HStack gap="xs">
                  <div className="w-15 h-15 bg-success rounded-md shadow-sm" />
                  <div className="w-15 h-15 bg-warning rounded-md shadow-sm" />
                  <div className="w-15 h-15 bg-danger rounded-md shadow-sm" />
                  <div className="w-15 h-15 bg-info rounded-md shadow-sm" />
                </HStack>
              </VStack>
            </VStack>
          </Card>
          {/* Typography */}
          <Card variant="elevated" padding="lg">
            <Text variant="h3">Typography</Text>
            <VStack gap="sm" align="start">
              <Text variant="h1">Heading 1</Text>
              <Text variant="h2">Heading 2</Text>
              <Text variant="h3">Heading 3</Text>
              <Text variant="body">Body text for paragraphs and content</Text>
              <Text variant="caption">
                Caption text for secondary information
              </Text>
              <Text variant="label">Label text for form fields</Text>
            </VStack>
          </Card>
        </VStack>
        <VStack gap="lg">
          <Grid columns={2} gap="lg">
            {/* Arquitectura */}
            <Card variant="elevated" padding="lg">
              <VStack gap="md">
                <Text variant="h3">Arquitectura del Design System</Text>
                <Text variant="body">
                  Tokens → Filosofías de Diseño → CVA Variants → Componentes
                </Text>
                <HStack gap="sm" justify="center" wrap>
                  <Badge variant="neutral">Portable</Badge>
                  <Badge variant="neutral">Type-Safe</Badge>
                  <Badge variant="neutral">Themeable</Badge>
                  <Badge variant="neutral">5 Filosofías</Badge>
                </HStack>
              </VStack>
            </Card>
            {/* Caracteristicas */}
            <Card variant="elevated" padding="lg">
              <Text variant="h3">Características</Text>
              <Grid
                gap="md"
                templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              >
                <VStack gap="none" align="start">
                  <Text variant="label">Border Radius</Text>
                  <Text variant="body">md</Text>
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Font Weight</Text>
                  <Text variant="body">bold</Text>
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Border Width</Text>
                  <Text variant="body">1px</Text>
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Spacing Scale</Text>
                  <Text variant="body">4x</Text>
                </VStack>
              </Grid>
            </Card>
          </Grid>
          <Grid columns={3} gap="lg">
            {/* Buttons */}
            <Card variant="elevated" padding="lg">
              <Text variant="h3">Buttons</Text>
              <VStack gap="sm">
                <VStack gap="xs" align="start">
                  <Text variant="caption">Intent variants:</Text>
                  <HStack gap="xs" wrap>
                    <Button intent="primary" size="md">
                      Primary
                    </Button>
                    <Button intent="secondary" size="md">
                      Secondary
                    </Button>
                    <Button intent="danger" size="md">
                      Danger
                    </Button>
                    <Button intent="outline" size="md">
                      Outline
                    </Button>
                    <Button intent="ghost" size="md">
                      Ghost
                    </Button>
                  </HStack>
                </VStack>
                <VStack gap="xs" align="start">
                  <Text variant="caption">Size variants:</Text>
                  <HStack gap="xs" align="center" wrap>
                    <Button intent="primary" size="sm">
                      Small
                    </Button>
                    <Button intent="primary" size="md">
                      Medium
                    </Button>
                    <Button intent="primary" size="lg">
                      Large
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
            {/* Forms */}
            <Card variant="elevated" padding="lg">
              <Text variant="h3">Form Controls</Text>
              <VStack gap="md" align="stretch">
                <VStack gap="none" align="start">
                  <Text variant="label">Input Field</Text>
                  <Input
                    id="input-example"
                    placeholder="Enter your text..."
                    size="md"
                  />
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Select Dropdown</Text>
                  <Select
                    options={selectOptions}
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    placeholder="Choose an option..."
                    size="md"
                    id="select-example"
                  />
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Switch Toggle</Text>
                  <HStack gap="sm" align="center">
                    <Switch
                      size="sm"
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                    />
                    <Switch
                      size="md"
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                    />
                    <Switch
                      size="lg"
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                    />
                  </HStack>
                </VStack>
                <VStack gap="none" align="start">
                  <Text variant="label">Checkboxes</Text>
                  <VStack gap="xs" align="start">
                    <Checkbox
                      size="md"
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                      label="Accept terms and conditions"
                    />
                    <Checkbox size="md" label="Subscribe to newsletter" />
                  </VStack>
                </VStack>
              </VStack>
            </Card>
            {/* Badges */}
            <Card variant="elevated" padding="lg">
              <Text variant="h3">Badges</Text>
              <VStack gap="sm" marginTop="xs">
                <VStack gap="xs" align="start">
                  <Text variant="caption">Variant styles:</Text>
                  <HStack gap="xs" wrap>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                  </HStack>
                </VStack>
                <VStack gap="xs" align="start">
                  <Text variant="caption">Size variants:</Text>
                  <HStack gap="xs" align="center" wrap>
                    <Badge variant="primary" size="sm">
                      Small
                    </Badge>
                    <Badge variant="primary" size="md">
                      Medium
                    </Badge>
                    <Badge variant="primary" size="lg">
                      Large
                    </Badge>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Grid>
    </Box>
  );
}
