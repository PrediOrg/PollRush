import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  parentId?: string;
}

interface Tag {
  id: string;
  name: string;
  categoryId: string;
  usageCount: number;
}

interface PollCategoriesProps {
  categories: Category[];
  tags: Tag[];
  onAddCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  onEditCategory: (category: Category) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
  onAddTag: (tag: Omit<Tag, 'id' | 'usageCount'>) => Promise<void>;
  onDeleteTag: (tagId: string) => Promise<void>;
  isSubmitting?: boolean;
}

const PollCategories: React.FC<PollCategoriesProps> = ({
  categories,
  tags,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onAddTag,
  onDeleteTag,
  isSubmitting = false,
}) => {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    color: '#1976d2',
  });
  const [newTag, setNewTag] = useState<Omit<Tag, 'id' | 'usageCount'>>({
    name: '',
    categoryId: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleCategoryDialogOpen = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setNewCategory({
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        parentId: category.parentId,
      });
    } else {
      setSelectedCategory(null);
      setNewCategory({
        name: '',
        description: '',
        color: '#1976d2',
      });
    }
    setCategoryDialogOpen(true);
  };

  const handleCategoryDialogClose = () => {
    setCategoryDialogOpen(false);
    setSelectedCategory(null);
    setNewCategory({
      name: '',
      description: '',
      color: '#1976d2',
    });
    setError(null);
  };

  const handleTagDialogOpen = () => {
    setTagDialogOpen(true);
    setNewTag({
      name: '',
      categoryId: '',
    });
    setError(null);
  };

  const handleTagDialogClose = () => {
    setTagDialogOpen(false);
    setNewTag({
      name: '',
      categoryId: '',
    });
    setError(null);
  };

  const handleCategorySubmit = async () => {
    if (!newCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      if (selectedCategory) {
        await onEditCategory({
          ...selectedCategory,
          ...newCategory,
        });
      } else {
        await onAddCategory(newCategory);
      }
      handleCategoryDialogClose();
    } catch (error) {
      setError('Failed to save category. Please try again.');
      console.error('Failed to save category:', error);
    }
  };

  const handleTagSubmit = async () => {
    if (!newTag.name.trim() || !newTag.categoryId) {
      setError('Tag name and category are required');
      return;
    }

    try {
      await onAddTag(newTag);
      handleTagDialogClose();
    } catch (error) {
      setError('Failed to add tag. Please try again.');
      console.error('Failed to add tag:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await onDeleteCategory(categoryId);
    } catch (error) {
      setError('Failed to delete category. Please try again.');
      console.error('Failed to delete category:', error);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      await onDeleteTag(tagId);
    } catch (error) {
      setError('Failed to delete tag. Please try again.');
      console.error('Failed to delete tag:', error);
    }
  };

  const getCategoryTags = (categoryId: string) => {
    return tags.filter((tag) => tag.categoryId === categoryId);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h6">Categories & Tags</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleCategoryDialogOpen()}
            >
              Add Category
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleTagDialogOpen}
            >
              Add Tag
            </Button>
          </Stack>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon sx={{ color: category.color }} />
                  <Typography variant="h6">{category.name}</Typography>
                </Box>
                <Box>
                  <Tooltip title="Edit Category">
                    <IconButton
                      size="small"
                      onClick={() => handleCategoryDialogOpen(category)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Category">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {category.description}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {getCategoryTags(category.id).map((tag) => (
                    <Chip
                      key={tag.id}
                      label={`${tag.name} (${tag.usageCount})`}
                      size="small"
                      onDelete={() => handleDeleteTag(tag.id)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={categoryDialogOpen}
        onClose={handleCategoryDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label="Color"
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              fullWidth
            />

            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              value={categories.find((c) => c.id === newCategory.parentId) || null}
              onChange={(_, value) => setNewCategory({ ...newCategory, parentId: value?.id })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Parent Category (Optional)"
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCategoryDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCategorySubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={tagDialogOpen}
        onClose={handleTagDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Tag</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              fullWidth
              required
            />

            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              value={categories.find((c) => c.id === newTag.categoryId) || null}
              onChange={(_, value) => setNewTag({ ...newTag, categoryId: value?.id || '' })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  required
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleTagDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleTagSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Tag'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollCategories; 